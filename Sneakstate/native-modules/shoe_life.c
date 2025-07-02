// shoe_life.c
// Module C pour calculer la vie restante d'une chaussure

int update_shoe_life(int current_life, int duration, int type, int sol, float jump_height) {
    float fatigue = duration * 0.1;
    if (type == 1) fatigue *= 1.2; // match
    if (sol == 1) fatigue *= 1.5; // sol dur
    fatigue += jump_height * 0.05;
    int new_life = current_life - (int)fatigue;
    if (new_life < 0) new_life = 0;
    return new_life;
}